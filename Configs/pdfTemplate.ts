export const pdfTemplate = (
  data: any,
  background: any,
  tahalufLogo: any,
  harmonyLogo: any,
  courseName: string,
  startDate: string,
  endDate: string,
  firstName: string,
  lastName: string,
  lhub: any,
  scanMe: any,
  expDate: string | undefined,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        font-family: "Comfortaa";
        background-image: url("data:image/png;base64,${background}");
        background-repeat: no-repeat;
        background-size: cover;
      }
      #harmony {
        position: absolute;
        top: 210px;
        left: 175px;
        width: 120px;
      }
      #lhub {
        position: absolute;
        top: 160px;
        left: 120px;
        height: 45px;
      }
      #tahaluf {
        position: absolute;
        top: 180px;
        right: 170px;
        width: 120px;
      }
      #center {
        position: absolute;
        display: flex;
        flex-direction: column;
        height: 98%;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      #qr {
        position: absolute;
        bottom: 150px;
        right: 170px;
        width: 150px;
      }
      .textFocus {
        color: crimson;
      }
      .title {
        font-size: 3rem;
        font-weight: 900;
        margin: 4px;
      }
      .meduim {
        font-size: 2rem;
        margin: 4px;
        font-weight: 100;
      }
      .large {
        font-size: 2.6rem;
        margin: 4px;
      }
      .qrBorder {
        border: 2px solid black;
        padding: 5px;
        padding-bottom: 4px;
      }
    </style>
  </head>
  <body>
    <img id="harmony" src="data:image/png;base64,${harmonyLogo}" alt="" srcset="" />
    <img id="lhub" src="data:image/png;base64,${lhub}" alt="" srcset="" />
    <img id="tahaluf" src="data:image/png;base64,${tahalufLogo}" alt="" srcset="" />
    <div id="qr">
      <div class="qrBorder">
    <img src="data:image/png;base64,${data}" alt="Red dot"  style="width: 100%"/>
      </div>
      <img src="data:image/png;base64,${scanMe}" style="width: 100%" />
    </div>
    <div id="center">
      <p class="textFocus title">Certificate Of Completion</p>
      <p class="meduim">This is to certify</p>
      <p class="textFocus large">${firstName} ${lastName}</p>
      <p class="meduim">Has successfully completed the following course</p>
      <p class="textFocus large">${courseName}</p>
      <p class="meduim">Offerd by Harmony IT Solution L.L.C</p>
      <p class="meduim">From:${new Date(
        startDate,
      ).toLocaleDateString()} - To:${new Date(endDate).toLocaleDateString()}</p>
      <p class="meduim">Total Days:${getPeriod(startDate, endDate)}</p>
      <p class="meduim">Exp Date:${
        expDate ? new Date(expDate).toLocaleDateString() : 'Life Time'
      }</p>
    </div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,300;0,400;1,100;1,300;1,400&display=swap"
      rel="stylesheet" />
  </body>
</html>
`;
const getPeriod = (startDate: string, endDate: string) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);

  const diffDays = Math.round(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay),
  );
  return diffDays;
};
