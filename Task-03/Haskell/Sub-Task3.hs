main :: IO ()
main = do
    putStr "Enter a number: "
    n <- readLn
    
    mapM_ (\i -> putStrLn (replicate (n - i) ' ' ++ replicate (2 * i - 1) '*')) [1..n]
    
    mapM_ (\i -> putStrLn (replicate (n - i) ' ' ++ replicate (2 * i - 1) '*')) [n-1, n-2 .. 1]
