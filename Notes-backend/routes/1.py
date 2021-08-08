def sortedarr(in_string):
    for i in range(len(in_string)):
        for j in range(i):
            if int(in_string[j])<int(in_string[j+1]):
                tmp=in_string[j]
                in_string[j]=in_string[j+1]
                in_string[j+1]=tmp
    print(in_string)


in_string= [‘G’, ‘B’, ‘R’, ‘R’, ‘B’, ‘R’, ‘G’]

sortedarr(in_string)