import request from 'axios';

interface getSingleProduct {
    id: number;
}

export const getSingleProduct = ({
    id,
}: getSingleProduct) => new Promise((resolve, reject) => {
    request
        .get(
            '/getProduct/:id',
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
            },
        )
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            if (error.response) {
                reject(error.response);
            } else if (error.request) {
                reject(error.request);
            } else {
                reject(error.message);
            }
        });
});