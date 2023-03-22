import request from "../utils/request/request";
export default{
    login(data){
        return request("/login/login", "post", data);
    }
}
