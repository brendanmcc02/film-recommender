# non-movies were deleted from title.basics and written to a file: only-movies-basics.json
# this script will take that data, and remove films released before 1940.
import json


def main():
    # import only-movies-basics.json
    onlyMoviesData = open('../data/only-movies-basics.json')
    onlyMoviesDataDict = json.load(onlyMoviesData)

    # for each film:
    i = 0
    length = len(onlyMoviesDataDict)
    while i < length:
        try:
            # if film was released before 1940
            if onlyMoviesDataDict[i]['year'] < 1940:
                # delete the film
                del onlyMoviesDataDict[i]
                i = i - 1
                length = length - 1
            # else: keep the film
            else:
                print(str(i) + "/" + str(length))
        except ValueError:
            # for some reason, some entries in 'startYear' are not int types, so this catches the exception and
            # just deletes the film
            del onlyMoviesDataDict[i]
            i = i - 1
            length = length - 1

        i = i + 1

    # write to file
    with open('../data/pre-1940-basics.json', 'w') as convert_file:
        convert_file.write(json.dumps(onlyMoviesDataDict, indent=4, separators=(',', ': ')))


if __name__ == "__main__":
    main()

