
const newcom = (payload) =>({
    nama: payload.nama,
    kelas: payload.kelas,
    fakultas: payload.fakultas,
    jurusan: payload.jurusan,
    keluhan: payload.keluhan,
})

module.exports = {
    newcom
}