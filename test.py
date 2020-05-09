import re
pattern = "^[Kk][Aa]+[Ll]"
teks = input("masukkan")
print(re.match(teks, pattern))
