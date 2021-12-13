const keyToken = 'TOKEN';
const keyIdAdmin = 'ID_ADMIN';

let token = null;
let id_admin = null;

async function loadToken() {
    try {
        const value = sessionStorage.getItem(keyToken);
        if (value !== null && value !== undefined) {
            DataLocal.token = value.toString();
        } else {
            DataLocal.token = null;
        }
    } catch(e) {
        console.log(e);
        DataLocal.token = null;
    }
}

async function saveToken(data) {
    try {
        return sessionStorage.setItem(keyToken, data.toString());
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function loadIdAdmin() {
    try {
        const value = sessionStorage.getItem(keyIdAdmin);
        if (value !== null && value !== undefined) {
            DataLocal.id_admin = value;
        } else {
            DataLocal.id_admin = null;
        }
    } catch(e) {
        console.log(e);
        DataLocal.id_admin = null;
    }
}

async function saveIdAdmin(data) {
    try {
        return sessionStorage.setItem(keyIdAdmin, data);
    } catch (e) {
        console.log(e);
        return false;
    }
}

const DataLocal = {

    saveToken,
    loadToken,

    saveIdAdmin,
    loadIdAdmin,

    token,
    id_admin
};

export default DataLocal;
