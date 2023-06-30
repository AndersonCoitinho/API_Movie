const path = require("path");
const multer = require("multer");/*bibilioteca para fazer o upload*/
const crypto = require("crypto");

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp"); /*onde fica salvo temporario*/
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads"); /*onde fica salvo definitivo*/

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,/*arquivo vai ser mandando para a pasta temporaria quando for inicializado na aplicação*/
        filename(request, file, callback) {/*nome do arquivo esta sendo criptrografado*/
            const fileHash = crypto.randomBytes(10).toString("hex"); //criando hash p/ nomear arquivo
            const fileName = `${fileHash}-${file.originalname}`; //nomeando arquivo c/ hash

            return callback(null, fileName);
        },
    }),
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}
