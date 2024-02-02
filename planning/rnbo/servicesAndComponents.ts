// I'm partitioning the RNBO structures into three levels:
    // 1. Patch level
    // 2. Device level
    // 3. Parameter level
// at the patch level we have access to the device namespace, and we can share Buffer resources between devices
        // Services: 
            // RnboBufferService: create and access buffers in a namespace shared between devices 
            // RnboPatchingService: Route messages between devices 
        // Components:
            // RnboPatcherComponent? e.g. some interface for an indexed multidigraph, 
            // RnboBufferComponent? e.g. a waveform display for a buffer / input for urls / input for expressions
    // at the device level we have:
        // Services: 
            // RnboMessagingService: Send and receive messages to/from a specific device
            // RnboPresetService: create and access device presets 
            // RnboUIStylingService: this is where we implement the layouts defined in patcher.desc.meta 
        // Components:
            // RnboDeviceComponent: e.g. a device interface for a specific device
    // at the parameter level we have:
        // Services:
            // RnboParametersService: create and access parameters 
            // RnboParameterStylingService: style the components based on the parameter's meta data
