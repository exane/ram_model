const Ram = require("./RAM")

function p1() {
  const tape_alphabet = ["0", "1", "#", "_"]
  const tape_input = "101"
  const anim_speed = 1000

  const r = new Ram(tape_alphabet, anim_speed)

  r.READ()
  r.JUMP(9, 4)
  r.STORE(1)
  r.LOAD(0)
  r.ADD(0)
  r.ADD(1)
  r.STORE(0)
  r.JUMP(1)
  r.LOAD(0)
  r.WRITEACC()
  r.END()

  r.run(tape_input)
}

p1()
