document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const data = {
      tipoquadra: obterTiposTerrenoSelecionados(),
      numeroplayers: formData.get("numJogadores"),
      endeco: formData.get("endereco"),
      superficie: "",
      nomequadra: formData.get("name"),
      precohora: formatarPrecoHora(formData.get("precoPorHora")),
      horariosdisponiveis: obterHorariosDisponiveisSelecionados(),
    };

    fetch("https://6626eb22b625bf088c06e78f.mockapi.io/quadras", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao enviar os dados.");
        }
        return response.json();
      })
      .then((responseData) => {
        alert("Quadra Cadastrada")
        console.log("Dados enviados com sucesso:", responseData);
      })
      .catch((error) => {
        console.error("Erro ao enviar os dados:", error);
      });
  });

  function obterTiposTerrenoSelecionados() {
    const checkboxes = document.querySelector(
      'input[name="terreno"]:checked'
    );
    const tiposTerrenoSelecionados = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    return tiposTerrenoSelecionados;
  }

  function formatarPrecoHora(preco) {
    return "R$ " + parseFloat(preco).toFixed(2);
  }

  function obterHorariosDisponiveisSelecionados() {
    const checkboxes = document.querySelectorAll(
      'input[name="horarios"]:checked'
    );
    const horariosSelecionados = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    return horariosSelecionados;
  }
});

function getInfo() {
  window.location.href = "MainSystem/Quadras/QuadraCreate/quadrasCreate.html";
}

const courtDataForm = document.getElementById('courtDataForm');
const submitCourtDataButton = document.getElementById('submitCourtDataButton');
const imageUploadForm = document.getElementById('imageUploadForm');

const courtForm = document.getElementById('courtForm');
const submitButton = document.querySelector('form button');


submitButton.addEventListener('click', handleCourtDataAndImageUpload);

const mongoose = require('mongoose');
const fs = require('fs'); 

const uri = 'mongodb+srv://lucasjesuss2004:QuadraConecta@quadraconecta.aiaaw5y.mongodb.net/?retryWrites=true&w=majority&appName=QuadraConecta'; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting:', err));



  const mongoose = require('mongoose');
const fs = require('fs'); 

async function handleCourtDataAndImageUpload(event) {
  event.preventDefault(); 

  const courtData = {
    tipoquadra: document.getElementById('tipoquadraInput').value,
   
  };

  const selectedFile = document.getElementById('imageInput').files[0];

  if (selectedFile) {
    try {
      
      await submitCourtDataToOtherDB(courtData);

      
      await connectToMongoDB();

     
      const Court = await createCourtSchema();

      
      const newCourt = new Court({
        imagemQuadra: {
          data: null, 
          contentType: null 
        },
        
      });

      
      await newCourt.save();
      const savedCourtId = newCourt._id;

     
      const imageData = fs.readFileSync(selectedFile);

     
      const updatedCourt = await Court.findByIdAndUpdate(
        savedCourtId,
        { $set: { imagemQuadra: { data: imageData, contentType: selectedFile.mimetype } } },
        { new: true } 
      );

      console.log('Quadra adicionada e imagem carregada com sucesso!');
    } catch (error) {
      console.error('Error adding court and uploading image:', error);
    } finally {
      
      await mongoose.connection.close();
    }
  } else {
    console.error('No image selected.');
  }
}


module.exports = {
  handleCourtDataAndImageUpload
};


mongoose.connection.close();

