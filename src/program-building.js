import * as Program from './Program.js';


const program = new Program.Program();

program.addCommand(new Program.ClearCommand());
program.addCommand(new Program.PushMatrixCommand());
program.addCommand(new Program.TranslateCommand());
program.addCommand(new Program.PopMatrixCommand());
program.addCommand(new Program.FlushCommand());


export default program;
