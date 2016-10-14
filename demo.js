((window) => {
    let Tv = {
        open() {
            console.log('打开电视');
        },
        close() {
            console.log('关上电视');  
        }
    }
    
    /*class OpenTvCommand {
        constructor(receiver) {
            this.receiver = receiver;
        }
        
        set execute() {
            this.receiver.open();
        }
        set undo() {
            this.receiver.close();
        }
    }*/
    
    
    const createCommand = (receiver) => {
        let execute = () => {
            return receiver.execute();
        }
        
        let undo = () => {
            return receiver.undo();
        }
        
        return {
            execute,
            undo
        }
    }
    
    const setCommand = (command) => {
        document.querySelector("#execute").addEventListener('click', (e) => {
            command.execute();    
        });
        
        document.querySelector("#undo").addEventListener('click', (e) => {
            command.undo();
        })
    }
    
    //setCommand(new OpenTvCommand(Tv));
    
    setCommand(createCommand(Tv));
    
})(window);