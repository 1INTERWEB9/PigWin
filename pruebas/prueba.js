const axios = require("axios");
axios
  .post("http://localhost:3000/query/catalogo_universal", {
    values: {
      Nombre_Catalogo: "Chicharra",
      Tipo_Catalogo: 1,
    },
  })
  .then(({ data }) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
