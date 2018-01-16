<template>
  <div id="wrapper">
    <main>

      <div>
        <p class="title">1. Datein öffnen</p>
      </div>


      <div>
        <button class="button" @click="handleOpenFile">Datei öffnen</button>
        <span>{{ file }}</span>
      </div>

      <hr />

      <div>
        <p class="title">2. Drucker wählen</p>
      </div>

      <div>

        <select v-model="printerSelected">
          <option v-for="" value="">Kein Drucker ausgewählt</option>
          <option v-for="printer in printers" :value="printer.name">{{ printer.name }}</option>
        </select>
      </div>

      <div style="margin-top: 15px">
        <button class="button" @click="handlePrint" :disabled="!file || !printerSelected">Drucken</button>
      </div>


    </main>
  </div>
</template>

<script>

  // const remote = require('remote');
  // const dialog = remote.require('dialog');

  import Printer from './Printer'

  const {dialog} = require('electron').remote

  export default {
    name: 'landing-page',

    data () {
      return {
        file: '',
        printers: '',
        printerSelected: ''
      }
    },

    methods: {
      handleOpenFile (link) {

        dialog.showOpenDialog({
          title: 'PDF öffnen',
          buttonLabel: 'Öffnen',
          filters: [
            {name: 'Pdf', extensions: ['pdf']}
          ],
          properties: ['openFile']
        }, fileNames => {

          if (fileNames !== undefined && fileNames instanceof Array) {
            this.file = fileNames[0]
          }
        })

      },

      handlePrint () {
        Printer.print(this.printerSelected, this.file)
      }
    },

    created () {
      this.printers = Printer.listAll()
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; color: #fff}

  button {
    background: rgb(32, 139, 139);
    -webkit-border-radius: 28;
    -moz-border-radius: 28;
    border-radius: 28px;
    border: 0;
    font-family: Arial;
    color: #ffffff;
    font-size: 16px;
    padding: 10px 20px 10px 20px;
    text-decoration: none;
  }

  button:hover, .button:active {
    background: rgb(26, 107, 107);
  }

  button:active {
    outline: none;
    border: none;
  }

  button:focus {outline:0;}

  button[disabled] {
    background: rgb(121, 121, 121);
    color: rgb(157, 157, 157)
  }

  hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.05);
      margin: 15px 0;
  }

  #wrapper {
    background:rgb(24, 29, 41);
    height: 100vh;
    padding: 40px;
    width: 100vw;
  }


  main {

  }


  .title {
    color: rgb(32, 139, 139);
    font-size: 24px;
    padding-bottom: 20px;
  }



</style>
