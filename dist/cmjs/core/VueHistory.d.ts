declare const VueHistory: {
    _history: any;
    install(Vue: any, opt?: {
        router: {
            onReady: any;
            push: any;
            go: any;
            replace: any;
        };
        onExceed: (obj: any) => void;
        onExit: (obj: any) => void;
        onChange: (obj: any) => void;
    }): void;
};
export default VueHistory;
