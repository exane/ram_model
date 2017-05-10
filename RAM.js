const initStore = (size = 100) => {
  let arr = []
  for (let i=0; i < size; i++) {
    arr.push(0)
  }
  return arr
}

class Ram {
  constructor(tape_in, alphabet, store_size = 5) {
    this.PC = 1
    this.ACC = 0
    this.IN = tape_in
    this.OUT = ""
    this.x = 1
    this.S = initStore(store_size)
    this.alphabet = alphabet
  }

  Nr(w) {
    const index = this.alphabet.indexOf(w)
    if (index >= 0) return index
    return this.alphabet.length
  }

  READ() {
    this.ACC = this.Nr(this.IN[this.x - 1])
    this.x++
    this.PC++
  }

  WRITE(a = "") {
    this.OUT += a
    this.PC++
  }

  WRITEACC() {
    this.OUT += this.ACC
    this.PC++
  }

  LOADI(i) {
    this.ACC = i
    this.PC++
  }

  LOADIN(i) {
    this.ACC = this.S[this.S[i]]
    this.PC++
  }

  LOAD(i) {
    this.ACC = this.S[i]
    this.PC++
  }

  STORE(i) {
    this.S[i] = this.ACC
    this.PC++
  }

  STOREIN(i) {
    this.S[this.S[i]] = this.ACC
    this.PC++
  }

  JUMP(pc, condition = null) {
    if(condition == null || this.ACC == condition) return this.PC = pc
    return ++this.PC
  }

  SUB(i) {
    this.ACC -= this.S[i]
    if (this.ACC < 0) this.ACC = 0
    this.PC++
  }

  SUBI(i) {
    this.ACC -= i
    if (this.ACC < 0) this.ACC = 0
    this.PC++
  }

  ADD(i) {
    this.ACC += this.S[i]
    this.PC++
  }

  ADDI(i) {
    this.ACC += i
    this.PC++
  }

  END() {
    // noop
  }

  print(cmd, args = [], i) {
    const active = this.PC == i ? "=>" : ""
    console.log("%s %s %s %s", active, i, cmd, args)
  }

  printHead() {
    console.log("PC: %s | ACC: %s | x: %s | IN: %s | OUT: %s", this.PC, this.ACC, this.x, this.IN, this.OUT)
    const w = this.IN[this.x - 1]
    const nr = this.Nr(w)
    console.log("IN[x] = %s | Nr(IN[x]) = %s", w, nr)
    console.log("S: [%s]", this.S)
  }
}

module.exports = class Simulator {
  constructor(A, speed = 1000) {
    this._pc = 1
    this.program = []
    this.alphabet = A
    this.anim_speed = speed
  }

  run(tape, store_size = 5) {
    const sim = new Ram(tape, this.alphabet, store_size)
    this.print(sim)
    setTimeout(this._run.bind(this, sim), this.anim_speed)
  }

  _run(sim) {
    const { CMD, args = [] } = this.program[sim.PC - 1]
    if (CMD == "END") return
    sim[CMD](...args)

    this.print(sim)
    setTimeout(this._run.bind(this, sim), this.anim_speed)
  }

  print(sim) {
    console.log('\x1Bc')
    console.log("AnimSpeed: %sms\r\n", this.anim_speed)
    sim.printHead()

    for(let i=0; i < this.program.length; i++) {
      const { CMD, args = [] } = this.program[i]
      sim.print(CMD, args, i + 1)
    }
  }

  READ() {
    this.program.push({
      PC: this._pc++,
      CMD: "READ"
    })
  }

  LOADI(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "LOADI",
      args: [i]
    })
  }

  STORE(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "STORE",
      args: [i]
    })
  }

  STOREIN(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "STOREIN",
      args: [i]
    })
  }

  LOADIN(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "LOADIN",
      args: [i]
    })
  }

  LOAD(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "LOAD",
      args: [i]
    })
  }

  JUMP(pc, condition = null) {
    this.program.push({
      PC: this._pc++,
      CMD: "JUMP",
      args: [pc, condition]
    })
  }

  SUB(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "SUB",
      args: [i]
    })
  }

  SUBI(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "SUBI",
      args: [i]
    })
  }

  ADD(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "ADD",
      args: [i]
    })
  }

  ADDI(i) {
    this.program.push({
      PC: this._pc++,
      CMD: "ADDI",
      args: [i]
    })
  }

  WRITE(a) {
    this.program.push({
      PC: this._pc++,
      CMD: "WRITE",
      args: [a]
    })
  }

  WRITEACC() {
    this.program.push({
      PC: this._pc++,
      CMD: "WRITEACC"
    })
  }

  END() {
    this.program.push({
      PC: this._pc,
      CMD: "END"
    })
  }
}
