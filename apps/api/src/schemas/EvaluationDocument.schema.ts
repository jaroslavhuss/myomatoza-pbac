import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAppraisalDocument, IDepartment, IEvaluationDynamicDocument, IJobname, IRatingDistribution, IUser } from 'src/interfaces_enums';

export type EvaluationDocumentDocument = EvaluationDocument & Document;

@Schema()
export class EvaluationDocument implements IEvaluationDynamicDocument{
    
    @Prop({type:Object})
    selectedRep:IUser;

    @Prop({type:Object})
    selectedDepartment:IDepartment;
    @Prop({type:Object})
    selectedJobname:IJobname;
    @Prop()
    startDate:Date;
    @Prop()
    currentPositionHeld:Date;
    @Prop()
    appraisalDate:Date;
    @Prop()
    dateConfirmation:Date;
    @Prop({type:Object})
    appraisalDocument:IAppraisalDocument;
    @Prop({type:Object})
    raitingDistribution:IRatingDistribution;
    @Prop({type:Object})
    inputsStandard:{};
    @Prop({type:Object})
    inputsEnergizer:{};
    @Prop({type:Object})
    outputsStandard:{};
    @Prop({type:Object})
    competencies:{};
    @Prop()
    competenciesLetter:string;
    @Prop()
    competenciesFinaPercentageNumber:number; 
    @Prop({type:Object})
    comments:{};
    @Prop({type:Object})
    evaluationSummeries:{};
    @Prop()
    managerConsentButton:boolean;
    @Prop()
    employeeConsentButton:boolean;

    //Countables for INPUT section
    @Prop()
    energizerImportanceSum:number;
    @Prop()
    inputImportanceSum:number;
    @Prop()
    inputEnergizerSum:number;
    @Prop()
    inputStandardSum:number;
    @Prop()
    energizerInputFinalValue:number;
    @Prop()
    overallInputFinalvalue:number;
    @Prop()
    energizerInputLetter:string;
    @Prop()
    overallInputLetter:string;

    //Countables for OUTPUT section
    @Prop()
    outputStandardImportanceSum:number;
    @Prop()
    outputStandardSum:number;
    @Prop()
    outputStandardFinalValue:number;
    @Prop()
    outputStandardLetter:string;
    
    @Prop()
    repNameQuery:string;
    @Prop()
    appraisalPeriod:string;
    @Prop()
    country:string;
}

export const EvaluationDocumentSchema =
  SchemaFactory.createForClass(EvaluationDocument);