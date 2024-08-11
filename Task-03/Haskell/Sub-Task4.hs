import System.IO

main :: IO ()
main = do
  
    nStr <- readFile "input.txt"
    let n = read nStr :: Int

    writeFile "output.txt" (generateDiamond n)

generateDiamond :: Int -> String
generateDiamond n =
    let
        upper = [replicate (n - i) ' ' ++ replicate (2 * i - 1) '*' | i <- [1..n]]
       
        lower = [replicate (n - i) ' ' ++ replicate (2 * i - 1) '*' | i <- [n-1, n-2 .. 1]]
    in
        unlines (upper ++ lower)
