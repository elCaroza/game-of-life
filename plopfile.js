
// --- Namespace Directories ---
const LBL = {
    SRC : "src",
    TEMPLATES : "templates",
    COMPONENTS : "components",
    COMPONENT : "Component",
    SETTINGS : "Settings",
    STYLES : "Styles",
    TEST : "test",
    INDEX : "index"
}

// --- File Type Format
const FORMATS = {
    COMPONENT : "tsx",
    SETTINGS : "ts",
    STYLES : "scss",
    TEST : "tsx",
    INDEX : "ts"
}

// --- Real Path Directories ---
const PATHS = {
    TEMPLATES : {

        COMPONENT : {
            // templates/Component/Component.tsx.hbs
            COMPONENT : `${LBL.TEMPLATES}/${LBL.COMPONENT}/${LBL.COMPONENT}.${FORMATS.COMPONENT}.hbs`,
            // templates/Component/Settings.ts.hbs
            SETTINGS : `${LBL.TEMPLATES}/${LBL.COMPONENT}/${LBL.SETTINGS}.${FORMATS.SETTINGS}.hbs`,
            // templates/Component/Styles.scss.hbs
            STYLES : `${LBL.TEMPLATES}/${LBL.COMPONENT}/${LBL.STYLES}.${FORMATS.STYLES}.hbs`,
            // templates/Component/test.hbs
            TEST : `${LBL.TEMPLATES}/${LBL.COMPONENT}/${LBL.TEST}.${FORMATS.TEST}.hbs`,
            // // templates/Component/index.ts.hbs
            INDEX : `${LBL.TEMPLATES}/${LBL.COMPONENT}/${LBL.INDEX}.${FORMATS.INDEX}.hbs`
        }
    },
    SRC : {

        // src/components
        COMPONENTS :  `${LBL.SRC}/${LBL.COMPONENTS}` 
    }    
}

const CONFIG = {
    COMPONENT : {
        META : {
            NAME : ( LBL.COMPONENT ).toLowerCase(),
            DESCRIPTION : ` ( Creazione ${ LBL.COMPONENT } )`,
            PROMPT_INPUT : `- Inserire nome ${ LBL.COMPONENT } :`,
            ALIAS : ( LBL.COMPONENT ).toUpperCase()
        },
        ROOT_PATH : PATHS.SRC.COMPONENTS,
        RULES : {
            INDEX : {
                PREFIX : false,
                SEPARATOR : ""
            },
            TEST : {
                PREFIX : true,
                SEPARATOR : "."
            },
            ___ALL : {
                PREFIX : true,
                SEPARATOR : "-"
            }
        } 
    }
}

const ENQUEUE_FILES_OF = ( aliasElemToGenerate ) => {
    let files = [];
    const ELEM = CONFIG[ aliasElemToGenerate ];
    for ( let fileType in PATHS.TEMPLATES[ aliasElemToGenerate ] ) {
        let rules = ELEM.RULES[ fileType ] || ELEM.RULES[ "___ALL" ];
        let folderPath = `${ ELEM.ROOT_PATH }/{{pascalCase name}}`;
        let fileName = `${ ( rules.PREFIX ? '{{pascalCase name}}' : '' ) }${ rules.SEPARATOR }${LBL[ fileType ]}.${FORMATS[ fileType ]}`
        files.push({
            type: "add",
            path: `${ folderPath }/${ fileName }`,
            templateFile: PATHS.TEMPLATES[ aliasElemToGenerate ][ fileType ]
        })
    }
    return files;
}

module.exports = plop => {

    // --- CONFIGURAZIONE COMPONENTE ---
    plop.setGenerator( CONFIG.COMPONENT.META.NAME, {
      description: CONFIG.COMPONENT.META.DESCRIPTION,
      prompts: [
        {
          type: "input",
          name: "name",
          message: CONFIG.COMPONENT.META.PROMPT_INPUT,
        },
      ],
      actions: [
        ...ENQUEUE_FILES_OF( CONFIG.COMPONENT.META.ALIAS )
      ],
    })

    // ### NON ANCORA IMPLEMENTATI SOLO ESEMPI #####
    plop.setGenerator('page', {
      description: 'Create a page',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your page name?',
        },
      ],
      actions: [],
    })
  
    plop.setGenerator('service', {
      description: 'Create service',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your service name?',
        },
      ],
      actions: [],
    })
  
    plop.setGenerator('hook', {
      description: 'Create a custom react hook',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'What is your hook name?',
        },
      ],
      actions: [],
    })
  }