

export class Program {
  constructor() {
    this.commands = [];
  }

  clearCommands() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  removeCommand(command) {
    // TODO check splice api
    throw new Exception('not yet implemented the moveCommand fn');
    this.commands.splice();
  }

  moveCommand(command, beforeCommand) {
    // TODO check splice api
    throw new Exception('not yet implemented the moveCommand fn');
    this.commands.splice();
  }
}

class Command {
  constructor(name, returnValue = VoidType, ...parameters) {
    this.name = name;
    this.returnValue = returnValue;
    this.parameters = parameters;
  }
}

class Parameter {
  constructor(type, name, immutableValue) {
    this.type = type;
    this.name = name;
    this.immutableValue = immutableValue;
  }

  set value(value) {
    if (typeof value !== this.type.jsType.toLowerCase()) {
      throw new Error(`Tried to set the value ${value} of a parameter but it
        did not match the expected type: ${this.type.jsType}`);
    }
    if (this.type.isDomainRestricted && !this.type.isValueInDomain(value)) {
      throw new Error(`Tried to set the value (${value}) of a constant
        value type that was not in the list of possible values:
        ${this.possibleValues.toString()}`);
    }
    this.value = value;
  }

  get value() {
    return this.value;
  }
}

class Type {
  constructor(typeName, jsType, isArray = false, length = 1, isDomainRestricted = false) {
    this.typeName = typeName;
    this.jsType = jsType;
    this.isArray = isArray;
    this.isDomainRestricted = isDomainRestricted;
  }
}

class ConstantValueType extends Type {
  constructor(...possibleValues) {
    super('constant-value', String, false, 1, true);
    this.possibleValues = possibleValues || [];
  }

  isValueInDomain(value) {
    return (this.possibleValues.indexOf(value) === -1);
  }
}

export class PushMatrixCommand extends Command {
  constructor() {
    super('glPushMatrix');
  }
}

export class PopMatrixCommand extends Command {
  constructor() {
    super('glPushMatrix');
  }
}

export class TranslateCommand extends Command {
  constructor() {
    super('glTranslatef', VoidType,
      new Parameter(NumericType, 'x'),
      new Parameter(NumericType, 'y'),
      new Parameter(NumericType, 'z')
    );
  }
}

export class ScaleCommand extends Command {
  constructor() {
    super('glScalef', VoidType,
      new Parameter(NumericType, 'x'),
      new Parameter(NumericType, 'y'),
      new Parameter(NumericType, 'z')
    );
  }
}

export class RotateCommand extends Command {
  constructor() {
    super('glRotatef', VoidType,
      new Parameter(NumericType, 'angle'),
      new Parameter(NumericType, 'x'),
      new Parameter(NumericType, 'y'),
      new Parameter(NumericType, 'z')
    );
  }
}

export class LoadIdentityCommand extends Command {
  constructor() {
    super('glLoadIdentity');
  }
}

export class LoadMatrixCommand extends Command {
  constructor() {
    super('glLoadMatrixf', VoidType,
      new Parameter(NumericArrayType, 'matrixValues')
    );
  }
}

export class MultMatrixCommand extends Command {
  constructor() {
    super('glMultMatrixf', VoidType,
      new Parameter(NumericArrayType, 'matrixValues')
    );
  }
}

export class MatrixModeCommand extends Command {
  constructor() {
    super('glMatrixMode', VoidType,
      new Parameter(MatrixModeType, 'mode')
    );
  }
}

export class ClearCommand extends Command {
  constructor() {
    super('glClear', VoidType,
      new Parameter(ClearType, 'mode')
    );
  }
}

export class FlushCommand extends Command {
  constructor() {
    super('glFlush');
  }
}

const NumericType = new Type('numeric', Number);
const NumericArrayType = new Type('numeric-array', Number, true, 16);
const MatrixModeType = new ConstantValueType('GL_PROJECTION', 'GL_MODELVIEW');
const ClearType = new ConstantValueType('GL_COLOR_BUFFER_BIT');
const VoidType = new Type('void', undefined);
