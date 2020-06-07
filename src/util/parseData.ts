import cheerio from "cheerio";

interface parseData {
  rico: any | null;
  clear: any | null;
  modal: any | null;
  xp: any | null;
  warren: any | null;
}


const parseData = async (data: string) => {
  const $ = cheerio.load(data);
  
  const clearTable = $(
    "table#ctl00_ContentPlaceHolder1_rptAgenteContaMercado_ctl01_rptContaMercado_ctl00_rprCarteira_ctl00_grdCarteira tbody tr"
  );

  const modalTable = $(
    "table#ctl00_ContentPlaceHolder1_rptAgenteContaMercado_ctl02_rptContaMercado_ctl00_rprCarteira_ctl00_grdCarteira tbody tr"
  );

  const ricoTable = $(
    "table#ctl00_ContentPlaceHolder1_rptAgenteContaMercado_ctl04_rptContaMercado_ctl00_rprCarteira_ctl00_grdCarteira tbody tr"
  );

  const parseTable= (table: any) => {
    return table.map((i: any, element: any) => {
      return {
        company: $(element).find("td:nth-of-type(1)").text().trim(),
        type: $(element).find("td:nth-of-type(2)").text().trim(),
        stock: $(element).find("td:nth-of-type(3)").text().trim(),
        value: $(element).find("td:nth-of-type(5)").text().trim(),
        amount: $(element).find("td:nth-of-type(6)").text().trim(),
        total: $(element).find("td:nth-of-type(8)").text().trim(),
      }
    })
      .get();
  }

  const parsedData: parseData = {
    rico: ricoTable ? await parseTable(ricoTable) : null,
    clear: clearTable ? await parseTable(clearTable) : null,
    modal: modalTable ? await parseTable(modalTable) : null,
    xp: null,
    warren: null
  }

  return JSON.stringify(parsedData);
};

export default parseData;
