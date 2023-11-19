export const pdfTemplate = (
  data: any,
  background: any,
  tahalufLogo: any,
  harmonyLogo: any,
) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        background-image: url("data:image/png;base64,${background}");
        background-repeat: no-repeat;
        background-size: cover;
      }
      #harmony {
        position: absolute;
        top: 175px;
        left: 175px;
        width: 120px;
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
    </style>
  </head>
  <body>
    <img id="harmony" src="data:image/png;base64,${harmonyLogo}" alt="" srcset="" />
    <img id="tahaluf" src="data:image/png;base64,${tahalufLogo}" alt="" srcset="" />
    <img src="data:image/png;base64,${data}" alt="Red dot" id="qr" />
    <div id="center">
      <p class="textFocus title">Certificate Of Completion</p>
      <p class="meduim">This is to certify</p>
      <p class="textFocus large">Mohannad Alafeef</p>
      <p class="meduim">Has successfully completed the following course</p>
      <p class="textFocus large">Asp.Net Core Mvc</p>
      <p class="meduim">Offerd by Harmony IT Solution L.L.C</p>
      <p class="meduim">From:30-01-2023 - To:17-02-2023</p>
      <p class="meduim">Total Days:12</p>
    </div>
  </body>
</html>
`;
