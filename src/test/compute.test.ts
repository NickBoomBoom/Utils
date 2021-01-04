import {
  divide,
  multiply,
  plus,
  minus
} from '../core/compute'

test('1 + 1 = 2', () => {
  expect(plus(1,1))
})

test('0.333 + 0.333 = 0.999', () => {
  expect(plus(0.333, 0.333))
})

