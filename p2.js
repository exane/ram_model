const Ram = require("./RAM")

function p1() {
  const tape_alphabet = ["0", "1", "#", "_"]
  const tape_input = "101"
  const anim_speed = 100

  const r = new Ram(tape_alphabet, anim_speed)

  r.LOADI(2)
  r.STORE(0)
  r.LOAD(0)
  r.ADD(0)
  r.STOREIN(0)
  r.LOAD(0)
  r.ADDI(1)
  r.STORE(0)
  r.SUBI(1)
  r.STORE(1)
  r.LOADIN(1)
  r.STORE(1)
  r.ADD(1)
  r.STOREIN(0)
  r.JUMP(6)
  r.END()

  r.run(tape_input)
}

p1()
