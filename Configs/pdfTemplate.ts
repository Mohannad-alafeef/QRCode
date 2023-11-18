export const pdfTemplate = (data: any) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pdf Content</title>
    <style>
        body {
            font-size: 16px;
            color: rgb(0, 100, 200);
        }

        h1 {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Thaluf Al-Emarat</h1>
    <img src="data:image/png;base64,${data}" alt="Red dot" />
</body>
</html>
`;
