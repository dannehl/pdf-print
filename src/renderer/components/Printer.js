
const printer = require('printer')
const fs = require('fs')

export default class {


  static listAll () {
    return printer.getPrinters()
  }


  /**
   * Send file to a printers
   *
   * @param  {String} printerName The name of the printers
   * @param  {String} filename    File to print
   * @return {void}
   */
  static print (printerName, filename) {

    console.log(process.env.HOME);

    if (printerName === '') {
      throw new Error('Kein Drucker ausgewählt')
    }

    fs.readFile(filename, (err, data) => {

      if (err) {
        console.error('err:' + err);
        throw new Error('Datei nicht gefunden: ' + err)
      }

      console.log('data type is: '+typeof(data) + ', is buffer: ' + Buffer.isBuffer(data));

      printer.printDirect({
        printer: printerName,
        data: data,
        type: 'PDF',
        success (id) {
          console.log('printed with id ' + id)
        },
        error (err) {
          throw new Error('Druck fehlgeschlagen: ' + err)
        }
      })

    })

  }



}
