import click
import requests
from bs4 import BeautifulSoup
import os
import hashlib

BASE_URL = "https://www.opensubtitles.org"
OMDB_API_URL = "https://www.omdbapi.com/"
API_KEY = "2bdc52e0"  # OMDb API key

def get_imdb_id_from_url(url):
    movie_name = url.split('/')[-1].replace('.mpeg4', '').replace('-', ' ')
    response = requests.get(f"{OMDB_API_URL}?t={movie_name}&apikey={API_KEY}")
    if response.status_code == 200:
        data = response.json()
        return data.get("imdbID")
    return None

def get_movie_file_info_from_url(url):
    """Get the hash and file size of the movie file from the provided URL."""
    response = requests.head(url)
    file_size = int(response.headers.get('Content-Length', 0))
    
    hash_md5 = hashlib.md5()
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        for chunk in r.iter_content(chunk_size=8192):
            if chunk:  
                hash_md5.update(chunk)
    
    file_hash = hash_md5.hexdigest()
    return file_size, file_hash

def search_subtitles_by_imdb_id(imdb_id, language=None, file_size=None, hash=None):
    query = f"{BASE_URL}/en/search2/sublanguageid-{language}/imdbid-{imdb_id}" if language else f"{BASE_URL}/en/search2/imdbid-{imdb_id}"
    print(f"Search query: {query}")  
    response = requests.get(query)
    soup = BeautifulSoup(response.text, "html.parser")
    subtitles = soup.find_all("a", class_="bnone")
    
    filtered_subtitles = []
    for subtitle in subtitles:
        subtitle_details_url = f"{BASE_URL}{subtitle['href']}"
        details_response = requests.get(subtitle_details_url)
        details_soup = BeautifulSoup(details_response.text, "html.parser")
        
        subtitle_size_elem = details_soup.find("li", class_="size")
        subtitle_size = subtitle_size_elem.text.strip() if subtitle_size_elem else None
        
        
        subtitle_hash_elem = details_soup.find("li", class_="hash")
        subtitle_hash = subtitle_hash_elem.text.strip() if subtitle_hash_elem else None
       
        subtitle_size_bytes = int(subtitle_size.split()[0]) if subtitle_size else None
        
        
        if file_size and subtitle_size_bytes and subtitle_size_bytes != file_size:
            continue
        
        
        if hash and subtitle_hash and subtitle_hash != hash:
            continue
        
        filtered_subtitles.append(subtitle)
    
    return filtered_subtitles

@click.command()
@click.argument("url")
@click.option("-l", "--language", type=str, help="Filter subtitles by language (e.g., eng for English).")
@click.option("-o", "--output", type=click.Path(), help="Specify the output folder for the subtitles.", default=".")
@click.option("-s", "--file-size", is_flag=True, help="Filter subtitles by movie file size.")
@click.option("-h", "--match-by-hash", is_flag=True, help="Match subtitles by movie hash.")
def main(url, language, output, file_size, match_by_hash):
    
    imdb_id = get_imdb_id_from_url(url)
    if not imdb_id:
        click.echo(f"IMDb ID could not be found for the URL: {url}")
        return

    click.echo(f"IMDb ID for the given URL: {imdb_id}")

   
    file_size_bytes = None
    hash_value = None
    if file_size or match_by_hash:
        file_size_bytes, hash_value = get_movie_file_info_from_url(url)
        click.echo(f"File size: {file_size_bytes} bytes")
        click.echo(f"File hash: {hash_value}")

    
    subtitles = search_subtitles_by_imdb_id(imdb_id, language, file_size_bytes, hash_value)

    if not subtitles:
        click.echo(f"No subtitles found for the movie with IMDb ID: {imdb_id}")
        return

    click.echo(f"Found {len(subtitles)} subtitles for the movie with IMDb ID: {imdb_id}:")
    for i, subtitle in enumerate(subtitles):
        click.echo(f"{i + 1}: {subtitle.text}")

    # Step 4: Prompt user to choose a subtitle and download it
    choice = click.prompt("Enter the number of the subtitle to download", type=int)
    if choice < 1 or choice > len(subtitles):
        click.echo("Invalid choice.")
        return

    selected_subtitle = subtitles[choice - 1]
    subtitle_url = f"{BASE_URL}{selected_subtitle['href']}"
    download_subtitle(subtitle_url, output)
    click.echo(f"Subtitle downloaded to {output}")

def download_subtitle(url, output_folder):
    response = requests.get(url)
    subtitle_file = os.path.join(output_folder, url.split('/')[-1])
    with open(subtitle_file, "wb") as f:
        f.write(response.content)
    return subtitle_file

if __name__ == "__main__":
    main()
