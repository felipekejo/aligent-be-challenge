import { describe, expect, it } from 'vitest'
import { changeUnit } from '../src/utils/change-unit'


describe("Change Unit function", ()=>{
  it("should change unit from days to seconds", async()=>{
    const result = changeUnit(1, 'days', 'seconds')

    expect(result).toBe(86400)
  })

  it("should change unit from weeks to seconds", async()=>{
    const result = changeUnit(1, 'weeks', 'seconds')

    expect(result).toBe(604800)
  })
  it("should change unit from days to minutes", async()=>{
    const result = changeUnit(1, 'days', 'minutes')

    expect(result).toBe(1440)
  })

  it("should change unit from weeks to minutes", async()=>{
    const result = changeUnit(1, 'weeks', 'minutes')

    expect(result).toBe(10080)
  })
  it("should change unit from days to hours", async()=>{
    const result = changeUnit(1, 'days', 'hours')

    expect(result).toBe(24)
  })

  it("should change unit from weeks to hours", async()=>{
    const result = changeUnit(1, 'weeks', 'hours')

    expect(result).toBe(168)
  })
  it("should change unit from days to years", async()=>{
    const result = changeUnit(366, 'days', 'years')

    expect(result).toBe(1)
  })

  it("should change unit from weeks to years", async()=>{
    const result = changeUnit(53, 'weeks', 'years')

    expect(result).toBe(1)
  })
})