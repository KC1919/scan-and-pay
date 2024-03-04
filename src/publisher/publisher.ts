import * as amqp from 'amqplib';

const message = {
    id: '1',
}

class MessageQueue {
    static instance: amqp.Channel;
    static async Loader() {
        try {
            const connection = await amqp.connect('amqp://localhost:5672');
            const channel = await connection.createChannel();
            this.instance = channel;

            console.log('Connected to rabbitmq');

        } catch (error) {
            console.log('Error in amq:', error);

        }
    }

    static async publish(kind: string, data: Record<string, unknown>) {
        const result = await this.instance.assertQueue("jobs");
        this.instance.sendToQueue("jobs", Buffer.from(JSON.stringify(data)));
        console.log(`job sent successfully ${data} result:`, result)
        return result;
    }

    static async subscribe(kind: string) {
        try {
            await this.instance.consume("jobs", message => {
                if (!message || !message.content) {
                    throw new Error('No message');
                }
                const input = JSON.parse(message?.content.toString());
                console.log('input:', input, ' kind:', kind)
            })
        } catch (error) {
            console.log('Error in subscribe:', error)
        }

    }
}

export default MessageQueue;