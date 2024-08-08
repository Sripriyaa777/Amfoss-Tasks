def pyramid(rows):
    pattern = []

    for i in range(rows):
        line = " " * (rows - i - 1) + "* " * (i + 1)
        pattern.append(line)
    for j in range(rows - 1, 0, -1):
        line = " " * (rows - j) + "* " * j
        pattern.append(line)
    return pattern
def main():
   with open('input.txt', 'r') as infile:
        rows = int(infile.read().strip())

   pattern = pyramid(rows)

   with open('output.txt', 'w') as outfile:
        for line in pattern:
            outfile.write(line + '\n')
main()
