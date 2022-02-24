// singleton design pattern implentation
// this is a copy of how mongoose implements connections in mongodb.
// when you make a connection to mongodb in mongoose, the connection's
// state is stored in the mongoose class, that is why you dont need to
// call the actual mongodb instance when importing a mongoose model

import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
	private _client?: Stan;

	get client() {
		if (!this._client) {
			throw new Error('Cannot access NATS client before connecting')
		}

		return this._client
	}

	connect(clusterId: string, clientId: string, url: string) {
		this._client = nats.connect(clusterId, clientId, { url })

		return new Promise<void>((resolve, reject) => {
			this.client.on('connect', () => {
				console.log('Connected to NATS')
				resolve()
			})
			this.client.on('error', (err) => {
				reject(err)
			})
		})
	}
}


export const natsWrapper = new NatsWrapper()