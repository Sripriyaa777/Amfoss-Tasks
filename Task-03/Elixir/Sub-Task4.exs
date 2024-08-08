defmodule DiamondPattern do

  def main do
    n = File.read!("input.txt") |> String.trim() |> String.to_integer()
    diamond_pattern = generate_diamond(n)
    File.write!("output.txt", diamond_pattern)
    IO.puts "Diamond pattern generated and saved to output.txt"
  end

  defp generate_diamond(n) do
    top_half = Enum.map(1..n, fn i -> print_line(i, n) end)
    bottom_half = Enum.map((n-1)..1, fn i -> print_line(i, n) end)
    Enum.join(top_half ++ bottom_half, "\n")
  end

  defp print_line(i, n) do
    spaces = n - i
    stars = 2 * i - 1
    String.duplicate(" ", spaces) <> String.duplicate("*", stars)
  end
end

DiamondPattern.main()
