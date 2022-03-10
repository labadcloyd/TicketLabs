# Ticket Labs

Ticket labs is an ecommerce site for selling tickets. Although the site is not feature rich, this repo is mainly created to serve as a template for microservices using Nodejs.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to have docker installed with kubernetes enabled. You will also need a Stripe secret key, so make sure to sign up to stripe. It doesn't have to be an activated account.

### Installing

1. Clone the repo

```
git clone https://github.com/labadcloyd/TicketLabs
```

2. Install ingress-nginx

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.1/deploy/static/provider/cloud/deploy.yaml
```

3. Create the JWT Secret variable

```
kubectl create secret generic jwt-secret --from-literal=JWTSECRET={Your_Secret_here}
```

4. Create the Stripe Secret Key variable (make sure to get the stripe secret key from your stripe account)

```
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY={Your_Secret_here}
```

5. Finally, run the app

```
skaffold dev
```


## Running the tests

There have been some tests written in some of the services, if you want to run the tests follow the steps below.

1. Change directory to a service (for this example, were going for the tickets service)

```
cd tickets
```

2. Then simply run the test

```
npm run test
```

## Built With

* [Nodejs](https://nodejs.org/en/docs/) - The runtime used
* [ExpressJs](https://expressjs.com/en/4x/api.html) - The webframework used
* [MongoDb](https://docs.mongodb.com/) - The database used

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details