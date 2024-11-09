import { Console } from '@woowacourse/mission-utils';

const IOUtils = {
  async input(message) {
    return await Console.readLineAsync(message);
  },

  output(message) {
    Console.print(message);
  },

  newLine() {
    Console.print('');
  },
};

export default IOUtils;
