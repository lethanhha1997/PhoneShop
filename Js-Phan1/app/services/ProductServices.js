function ProductServices() {
    this.getProductList = function () {
        return axios({
            method: 'get',
            url: 'https://62e7692d0e5d74566af3b944.mockapi.io/Complete',
        });
    }
    this.addProduct = function(product){
        console.log(product)
        return axios({
            method: 'post',
            url: 'https://62e7692d0e5d74566af3b944.mockapi.io/Complete',
            data: product,
        });
    }
    this.getProductPhone = function (id){
        return axios({
            method: 'get',
            url: `https://62e7692d0e5d74566af3b944.mockapi.io/Complete/${id}`,
        });
    }
    this.updateProductPhone = function(id, product){
        return axios({
            method: 'put',
            url: `https://62e7692d0e5d74566af3b944.mockapi.io/Complete/${id}`,
            data: product,
        });
    }
}