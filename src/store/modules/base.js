let token = localStorage.getItem("token") || null;

let actions = {
    getData({}, params) {
        return new Promise((resolve, reject) => {
            window.axios.defaults.headers.common = {
                Authorization: "Berear " + token
            };
            let filters = {};
            for (let filter in params.filters) {
                let key = params.filters[filter].key;
                let value = params.filters[filter].value;
                filters[key] = value;
            }
            window.axios
                .get(
                    `
            ${window.baseUrl}${params.resource}`,
                    {
                        params: {
                            ...params.queryParams,
                            ...filters
                        }
                    }
                )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    showData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .get(`${window.baseUrl}${params.resource}/${params.id}`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    postData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .post(`${window.baseUrl}${params.resource}`, params.inputs)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    postFormData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token,
                    "Content-Type": "multipart/form-data"
                };
            }
            let form = new FormData();
            Object.keys(params.inputs).map(key => {
                if (
                    typeof (params.inputs[key] == "object") &&
                    (params.inputs[key].hasOwnProperty("ar") ||
                        params.inputs[key].hasOwnProperty("en"))
                ) {
                    if (params.inputs[key]["ar"])
                        form.append(key + "[ar]", params.inputs[key]["ar"]);
                    if (params.inputs[key]["en"])
                        form.append(key + "[en]", params.inputs[key]["en"]);
                } else {
                    form.append(key, params.inputs[key]);
                }
            });
            window.axios
                .post(`${window.baseUrl}${params.resource}`, form)
                .then(response => {
                    if (params.inputs.imageSelected)
                        delete params.inputs.imageSelected;
                    if (params.inputs.defaultImage)
                        delete params.inputs.defaultImage;
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    putData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .post(
                    `${window.baseUrl}${params.resource}/${params.id}`,
                    params.inputs
                )
                .then(response => {
                    if (params.inputs.imageSelected)
                    delete params.inputs.imageSelected;
                if (params.inputs.defaultImage)
                    delete params.inputs.defaultImage;
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    putFormData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token,
                    "Content-Type": "multipart/form-data"
                };
            }
            let form = new FormData();
            Object.keys(params.inputs).map(key => {
                if (
                    typeof (params.inputs[key] == "object") &&
                    (params.inputs[key].hasOwnProperty("ar") ||
                        params.inputs[key].hasOwnProperty("en"))
                ) {
                    if (params.inputs[key]["ar"])
                        form.append(key + "[ar]", params.inputs[key]["ar"]);
                    if (params.inputs[key]["en"])
                        form.append(key + "[en]", params.inputs[key]["en"]);
                } else {
                    form.append(key, params.inputs[key]);
                }
            });
            window.axios
                .post(`${window.baseUrl}${params.resource}/${params.id}`, form)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    removeData({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .delete(`${window.baseUrl}${params.resource}`, params.id)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    removeArray({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .delete(`${window.baseUrl}${params.resource}`, {
                    data: {
                        ids: params.ids
                    }
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    activeArray({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .put(`${window.baseUrl}${params.resource}/update_status`, {
                    ids: params.ids,
                    status: 1
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    unActiveArray({}, params) {
        return new Promise((resolve, reject) => {
            if (token) {
                window.axios.defaults.headers.common = {
                    Authorization: "Berear " + token
                };
            }
            window.axios
                .put(`${window.baseUrl}${params.resource}/update_status`, {
                    ids: params.ids,
                    status: 0
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

export default {
    namespaced: true,
    actions: actions
};
