# A JOURNEY THROUGH PIXEL MERGE 
## INTRODUCTION
 Let me take you through is fasinating project where I could connect colored dots across different images. What I thought would be a simple job turned into a fun dive into image processing with Python, OpenCV, and Pillow. In this post, I’ll take you through the whole process, sharing some tips and code snippets as we go.
## PROJECT OVERVIEW
The task was to process a series of images each 512x512 pixels with a colored dot on a white background,The goal was to:

  1. **Sort the Images** by the number in their filenames.
  2. **Detect the Dot** on each image using OpenCV and record its coordinates and color.
  3. **Draw Lines between the dots**on consecutive images, with the line's color matching the starting dot's color.
  4. **Handle Line Breaks:** Pure white images represented a break in the sequence.
### Setting Up the Environment   
```
sudo apt update
sudo apt install python3 python3-pip
pip3 install opencv-python pillow
git clone https://github.com/hrideshmg/Operation-Pixel-Merge
```
### Sorting the Images
First step is to sort the file according to filenumber.
```
import os
import re

def sort_images(image_folder):
    images = os.listdir(image_folder)
    images = sorted(images, key=lambda x: int(re.findall(r'\d+', x)[0]))
    return images
```
### Detecting the Dot
Next step is to use OpenCV to detect the colored dot in each image by converting the image to grayscale, applying a threshold, and finding contours:
```
import cv2

def detect_dot(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        cnt = contours[0]
        M = cv2.moments(cnt)
        if M["m00"] != 0:
            cx = int(M["m10"] / M["m00"])
            cy = int(M["m01"] / M["m00"])
        else:
            cx, cy = 0, 0
        color = img[cy, cx].tolist()
        return (cx, cy), tuple(color)
    return None, None
```
### Drawing Lines Between Dots
Next I drew lines between the dots on consecutive images using **Pillow**. The color of the line was determined by the starting dot's color.
```
from PIL import Image, ImageDraw

def draw_lines(image_folder, images):
    previous_coordinates = None
    previous_color = None
    
    for image_name in images:
        image_path = os.path.join(image_folder, image_name)
        coordinates, color = detect_dot(image_path)
        
        if coordinates and previous_coordinates:
            img = Image.open(image_path)
            
            # Convert to RGBA if the image has a transparency layer
            if img.mode in ('P', 'L'):
                img = img.convert("RGBA")
            
            draw = ImageDraw.Draw(img)
            draw.line([previous_coordinates, coordinates], fill=previous_color, width=2)
            img.save(image_path)
        
        if coordinates:
            previous_coordinates = coordinates
            previous_color = tuple(color)
        else:
            previous_coordinates = None
            previous_color = None
```
**Now simplely run the python script**
## My  experience
 This project turned out to be a fantastic way to put basic image processing skills to test in a real-world scenario. By making use of OpenCV's  image analysis features along with Pillow's drawing tools,that can effectively processes and links dots across various images.Even though it was little overwhelming at times it wasn't so hard to put everything together,
 Overall i really enjoyed working on this. And Whether you're an experienced coder or a newbie in computer science, I hope this post motivates you to dive into the  realm of image processing.

