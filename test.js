const airtableBaseId = "app8p4RecoWg7JsOX";
const airtableTableName = "Users";
const airtableApiKey = "patbjbBB4mGfLvwMD.e257cd19ea5b9b3a5337417837f56d29c6f8b8dfeae4a7853b8da010f990e3df"; 
const emailToSearch = "jessie.wu@everyoungai.com";
const encodedFormulaByEmail = encodeURIComponent(
        `{Email} = '${emailToSearch}'`
      );
 

async function fetchAllRecords(offsetParam) {
        let url = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}?filterByFormula=${encodedFormulaByEmail}`;
        if (offsetParam) {
          url += `&offset=${offsetParam}`;
        }

        try {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${airtableApiKey}`,
            },
          });
          const data = await response.json();
          allRecords = allRecords.concat(data.records);

          if (data.offset) {
            await fetchAllRecords(data.offset);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }