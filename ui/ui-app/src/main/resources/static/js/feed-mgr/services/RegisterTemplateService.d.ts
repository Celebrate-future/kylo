import {Templates} from "./TemplateTypes";

import Processor = Templates.Processor;
import Property = Templates.Property;
import PropertyAndProcessors = Templates.PropertyAndProcessors;
import ReusableTemplateConnectionInfo = Templates.ReusableTemplateConnectionInfo;


export interface RegisteredTemplateService {

    resetModel(): void;

    /**
     * Initialize the service for an empty template model
     */
    init(): void;

    /**
     * Gets the model object with attributes setup for the backend when saving a template
     * @return {{properties: any; id; description; defineTable: true | any | boolean; allowPreconditions: false | any | boolean; dataTransformation: false | any | {chartViewModel: null; datasourceIds: null; datasources: null; dataTransformScript: null; sql: null; states: Array} | {chartViewModel; datasourceIds; datasources; dataTransformScript; sql; states}; nifiTemplateId: any | string; templateName; icon; iconColor; reusableTemplate: false | any; needsReusableTemplate: false | any; reusableTemplateConnections: [] | any | Import.ReusableTemplateConnectionInfo[]; state; isStream: false | any; roleMemberships: [] | any | Array; owner; roleMembershipsUpdated: false | any; templateTableOption: any; timeBetweenStartingBatchJobs: any}}
     */
    getModelForSave(): any;

    /**
     * Return the reusable connection info object
     * @return {{reusableTemplateFeedName: string; feedOutputPortName: string; reusableTemplateInputPortName: string}[]}
     */
    newReusableConnectionInfo(): ReusableTemplateConnectionInfo[];

    /**
     * Is a probpery selected
     * @param property
     * @return {boolean | any}
     */
    isSelectedProperty(property: Property): boolean;

    /**
     * Returns the properties that are selected and also
     * @return {Templates.Property[]}
     */
    getSelectedProperties(): Property[];

    sortPropertiesForDisplay(properties: Property[]): PropertyAndProcessors;

    /**
     *
     * @param {(response: any) => any} successFn
     * @param {(err: any) => any} errorFn
     */
    fetchConfigurationProperties(successFn?: (response: any) => any, errorFn?: (err: any) => any): Promise<any>;

    /**
     * If the propertyList is empty, then find the metadata properties available.
     * If the propertyList has already been populated this will result in a noop.
     * @param {(response: any) => any} successFn
     * @param {(err: any) => any} errorFn
     * @return {Promise<any>}
     */
    fetchMetadataProperties(successFn?: (response: any) => any, errorFn?: (err: any) => any): Promise<any>;

    /**
     * Find the input ports associated with the reusable templates to make connections
     * @return {Promise<any>}
     */
    fetchRegisteredReusableFeedInputPorts(): Promise<any>;

    /**
     * Fetch the input PortDTO objects on the Root process group
     * @return {any}
     */
    fetchRootInputPorts(): Promise<any>;


    deriveExpression(expression: string, configOnly: boolean): string;


    /**
     * Do we render the incoming property with codemirror?
     * @param {Templates.Property} property
     * @return {boolean}
     */
    isRenderPropertyWithCodeMirror(property: Property): boolean;

    /**
     * Feed Processors can setup separate Templates to have special rendering done for a processors properties.
     * @see /js/define-feed/feed-details/get-table-data-properties.
     * @param key
     * @returns {boolean}
     */
    isCustomPropertyRendering(key: any): boolean;


    /**
     * Gets all templates registered or not.  (looks at Nifi)
     * id property will ref NiFi id
     * registeredTemplateId property will be populated if registered
     * @returns {HttpPromise}
     */
    getTemplates(): Promise<any>;

    /**
     * Gets the Registered Templates
     * @returns {HttpPromise}
     */
    getRegisteredTemplates(): Promise<any>;

    /**
     * Remove any processor properties that are not 'userEditable = true'
     * @param {Templates.Processor[]} processorArray
     * @param {boolean} keepProcessorIfEmpty
     * @return {Processor[]}
     */
    removeNonUserEditableProperties(processorArray: Processor[], keepProcessorIfEmpty: boolean): Processor[];

    /**
     * Updates the feedProcessingTemplateUrl for each processor in the model
     * @param model
     */
    setProcessorRenderTemplateUrl(model: any, mode: any): void;


    /**
     * Setup the inputProcessor and nonInputProcessor and their properties on the registeredTemplate object
     * used in Feed creation and feed details to render the nifi input fields
     * @param template
     */
    initializeProperties(template: any, mode: any, feedProperties: Property[]): void;


    disableTemplate(templateId: string): Promise<any>;


    /**
     *
     * @param templateId
     * @returns {*}
     */
    enableTemplate(templateId: any): Promise<any>;

    deleteTemplate(templateId: string): Promise<any>;

    /**
     * Walks the NiFi template and its related connections(if any) to the reusable flow and returns data about the graph, its processors, and any Datasource definitions
     *
     * @param nifiTemplateId
     * @param reusableTemplateConnections
     * @returns {processors:[{type:"",name:"",id:"",flowId:"",isLeaf:true/false},...],
     *                        templateProcessorDatasourceDefinitions:[{processorName:"",processorType:"",
     *                                                                 datasourceDefinition:{identityString:"",title:"",description:""}},...],
     *            request:{connectionInfo:reusableTemplateConnections}}
     */
    getNiFiTemplateFlowInformation(nifiTemplateId: string, reusableTemplateConnections: any): Promise<any>;

    /**
     * Warn if the model has multiple processors with the same name
     */
    warnInvalidProcessorNames(): void;

    accessDeniedDialog($filter: angular.IFilterService): void;


    /**
     * Check access to the current template returning a promise object resovled to {allowEdit:{true/false},allowAdmin:{true,false},isValid:{true/false}}
     */
    checkTemplateAccess(model: any): Promise<AccessControl.EntityAccessCheck>;

    /**
     * Assigns the model properties and render types
     * Returns a promise
     * @returns {*}
     */
    loadTemplateWithProperties(registeredTemplateId: string, nifiTemplateId: string, templateName: string): Promise<any>;


    /**
     * check if the user has access on an entity
     * @param permissionsToCheck an Array or a single string of a permission/action to check against this entity and current user
     * @param entity the entity to check. if its undefined it will use the current template in the model
     * @returns {*} a promise, or a true/false.  be sure to wrap this with a $q().then()
     */
    hasEntityAccess(permissionsToCheck: any, entity: any): boolean;


}
