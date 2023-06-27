const fs = require("fs")/*usado para trabalhar e manipular arquivos*/
const path = require("path")
const uploadConfig = require("../configs/upload")
class DiskStorage {
    async saveFile(file){
        await fs.promises.rename(/*rename serve para renomear ou mover o arquivo*/
            path.resolve(uploadConfig.TMP_FOLDER, file),/*aonde ele esta salvo*/
            path.resolve(uploadConfig.UPLOADS_FOLDER, file)/*aonde quero salvar ele*/
        );
        return file;
    }
    async deleteFile(file){
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
        try {
            await fs.promises.stat(filePath);/*"stat" returna o status do arquivo(se ele esta aberto,corrompido...)*/
        } catch {
            return;
        }
        await fs.promises.unlink(filePath)/*"unlink" vai remover o arquivo*/
    }
}
module.exports = DiskStorage;