import { LRUCache } from 'lru-cache'

const cache = new LRUCache({
    max: 100, // Max number of items
    ttl: 1000 * 60 * 5, // 5 minutes TTL
    sizeCalculation: (value, key) => {
        // Ensure the key is a string to get its length
        const keySize = typeof key === 'string' ? key.length : JSON.stringify(key).length;

        // Calculate the size of the value
        let valueSize;
        try {
            valueSize = JSON.stringify(value).length;
        } catch (e) {
            // If JSON.stringify fails (e.g., circular reference), fallback to a default size
            valueSize = 100; // Default size for complex objects
        }

        // Return the total size
        return keySize + valueSize;
    },
    maxSize: 50000, // Max memory in bytes
});

export default cache;