import urllib.request
from datetime import datetime, timedelta


def main():
    lastDownload_str = open('../data/last-download.txt', 'r').read()

    lastDownload = datetime.strptime(lastDownload_str, '%Y-%m-%d %H:%M:%S.%f')

    currDownload = datetime.now()

    diff = currDownload - lastDownload

    # if the file was downloaded >= 24 hours ago:
    if diff >= timedelta(hours=24):
        # download title.basics.tsv.gz
        urllib.request.urlretrieve("https://datasets.imdbws.com/title.basics.tsv.gz", "../data/title.basics.tsv.gz")

        # download title.ratings.tsv.gz
        urllib.request.urlretrieve("https://datasets.imdbws.com/title.ratings.tsv.gz", "../data/title.ratings.tsv.gz")
    else:
        print("\nnot downloading title.basics/ratings.tsv.gz since it was downloaded in the last 24 hours.")

    # write current timestamp to last-download.txt
    with open('../data/last-download.txt', 'w') as file:
        file.write(str(datetime.now()))


if __name__ == "__main__":
    main()
