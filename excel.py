import pandas as pd
import numpy as np
import os.path

# paste object from browser here
portfolio = [[]]


def create_portfolio(filename):
    print("File does not exist, creating new file.")
    df = pd.DataFrame(portfolio, columns=[
        "Ticker",
        "Quantity",
        "Weighted Average Cost",
        "Last Price",
        "Unrealised P/L (USD)",
        "Unrealised P/L (%)",
        "Market Value", "Price Target", "Stop Loss"
    ])
    df.to_csv(filename)


def update_portfolio(filename):
    print("Reading from " + filename)
    df1 = pd.read_csv(filename)
    df2 = pd.DataFrame(portfolio, columns=[
        "Ticker",
        "Quantity",
        "Weighted Average Cost",
        "Last Price",
        "Unrealised P/L (USD)",
        "Unrealised P/L (%)",
        "Market Value", "Price Target", "Stop Loss"
    ])
    tickers1 = df1["Ticker"].tolist()
    tickers2 = df2["Ticker"].tolist()

    for ticker in tickers2:
        if ticker in tickers1:
            print("Editing $" + ticker)
            priceTarget = df1.loc[df1["Ticker"] == ticker, "Price Target"]
            stopLoss = df1.loc[df1["Ticker"] == ticker, "Stop Loss"]
            df2.loc[df2["Ticker"] == ticker, "Price Target"] = priceTarget
            df2.loc[df2["Ticker"] == ticker, "Stop Loss"] = stopLoss

    df2.sort_values("Ticker")
    print("Saving to " + filename)
    df2.to_csv(filename)


def main():
    filename = "portfolio.csv"
    if not os.path.isfile(filename):
        create_portfolio(filename)

    update_portfolio(filename)


if __name__ == "__main__":
    main()
