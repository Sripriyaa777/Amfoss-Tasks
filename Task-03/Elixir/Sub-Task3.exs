def main do
    IO.puts "Enter a number:"
    n = String.to_integer(IO.gets("") |> String.trim)
    print_diamond(n)
  end
  defp print_diamond(n) do
    Enum.each(1..n, fn i -> print_line(i, n) end)
    Enum.each((n-1)..1, fn i -> print_line(i, n) end)
  end

  defp print_line(i, n) do
    spaces = n - i
    stars = 2 * i - 1

    IO.puts String.duplicate(" ", spaces) <> String.duplicate("*", stars)
  end
end

DiamondPattern.main()
