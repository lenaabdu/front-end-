import axios from 'axios'
//const url = 'http://localhost:7008'
const url = 'https://back-end-app-1.herokuapp.com'

export class Apireg {

    async apicall(method, url, data) {
        try {
            return  await axios({
                method,
                url,
                data
            });
        } catch (error) {
            if (error.response.status === 403) {
                this.logoutHandler();
                return Promise.reject();
            } else {
                throw error;
            }
        }
    }


    getUser() {
        return this.apiCall('get', `${url}/apireg`)
    }

    addUser(email, password,confirmPassword, eircode) {
        return this.apicall('post', `${url}/apireg`, { email, password,confirmPassword,eircode  })
    }
    


}