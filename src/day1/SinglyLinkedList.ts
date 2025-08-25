

class Node<T> {
    public value: T;
    public next?: Node<T>;
    constructor(value: T) {
        this.value = value;
        this.next = undefined;
    }
}

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = new Node(item);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) throw new RangeError('Index out of bounds');
        if (idx === 0) {
            this.prepend(item);
            return;
        }
        if (idx === this.length) {
            this.append(item);
            return;
        }
        let prev = this.head;
        for (let i = 0; i < idx - 1; i++) {
            if (!prev) throw new Error('Unexpected null node');
            prev = prev.next;
        }
        const node = new Node(item);
        node.next = prev!.next;
        prev!.next = node;
        this.length++;
    }
    append(item: T): void {
        const node = new Node(item);
        if (!this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }
    remove(item: T): T | undefined {
        if (!this.head) return undefined;
        if (this.head.value === item) {
            const val = this.head.value;
            this.head = this.head.next;
            if (!this.head) this.tail = undefined;
            this.length--;
            return val;
        }
        let prev = this.head;
        let curr = this.head.next;
        while (curr) {
            if (curr.value === item) {
                prev.next = curr.next;
                if (curr === this.tail) this.tail = prev;
                this.length--;
                return curr.value;
            }
            prev = curr;
            curr = curr.next;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        let curr = this.head;
        for (let i = 0; i < idx; i++) {
            if (!curr) return undefined;
            curr = curr.next;
        }
        return curr?.value;
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) return undefined;
        if (idx === 0 && this.head) {
            const val = this.head.value;
            this.head = this.head.next;
            if (!this.head) this.tail = undefined;
            this.length--;
            return val;
        }
        let prev = this.head;
        for (let i = 0; i < idx - 1; i++) {
            if (!prev) return undefined;
            prev = prev.next;
        }
        const node = prev?.next;
        if (!node) return undefined;
        prev!.next = node.next;
        if (node === this.tail) this.tail = prev;
        this.length--;
        return node.value;
    }
}