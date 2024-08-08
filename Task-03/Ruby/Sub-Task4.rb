def generate_diamond(n)
  diamond = ""

  (0...n).each do |i|
    diamond += " " * (n - i - 1) + "* " * (i + 1) + "\n"
  end
  
  (n - 2).downto(0) do |i|
    diamond += " " * (n - i - 1) + "* " * (i + 1) + "\n"
  end

  diamond
end

begin
  
  input_file = 'input.txt'
  output_file = 'output.txt'

  n = File.read(input_file).to_i

  if n > 0
    diamond_pattern = generate_diamond(n)

    File.open(output_file, 'w') do |file|
      file.write(diamond_pattern)
    end

  end
end
