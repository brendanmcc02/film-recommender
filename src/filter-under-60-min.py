# given pre-1930-basics, get rid of films under 60 minutes in length
import json


def main():
    # import pre-1930-basics.json
    pre1930Data = open('../data/pre-1930-basics.json')
    pre1930DataDict = json.load(pre1930Data)

    # for each film:
    i = 0
    length = len(pre1930DataDict)
    while i < length:
        # if film is < 60 minutes in length
        if pre1930DataDict[i]['runtime'] < 60:
            # delete the film
            del pre1930DataDict[i]
            i = i - 1
            length = length - 1
        # else: keep the film
        else:
            print(str(i) + "/" + str(length))

        i = i + 1

    # write to file
    with open('../data/over-60-min-basics.json', 'w') as convert_file:
        convert_file.write(json.dumps(pre1930DataDict, indent=4, separators=(',', ': ')))


if __name__ == "__main__":
    main()

