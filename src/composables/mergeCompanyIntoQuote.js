export function useMergeCompanyIntoQuote(quotes) {
  let data = [];

  function useMergeCompanyIntoQuotes() {
    data = quotes.reduce((allQuotes, item) => {
      item.Quote.forEach((quote) => {
        quote.Company = item.Company;
        allQuotes.push(quote);
      });
      return allQuotes;
    }, []);
  }

  useMergeCompanyIntoQuotes();

  return { data };
}
