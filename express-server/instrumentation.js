const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} = require('@opentelemetry/sdk-metrics');
const { logs } = require("@opentelemetry/api-logs");
const { LoggerProvider, BatchLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const { 
    AzureMonitorTraceExporter,
    AzureMonitorMetricExporter,
    AzureMonitorLogExporter
 } = require('@azure/monitor-opentelemetry-exporter');

 const connectionString = process.env["APPLICATIONINSIGHTS_CONNECTION_STRING"] || "InstrumentationKey=d5f7e6a0-2011-4613-8e7d-6afd8033962b;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=ba70588a-4305-4433-a892-63c530176622";

// Create an instance of the Azure Monitor Trace Exporter
const azureMonitorExporter = new AzureMonitorTraceExporter({
  connectionString: connectionString,
});

// Add the exporter into the MetricReader and register it with the MeterProvider
const exporter = new AzureMonitorMetricExporter({
    connectionString:
      connectionString,
  });
  const metricReaderOptions = {
    exporter: exporter,
  };

// Add the Log exporter into the logRecordProcessor and register it with the LoggerProvider
const logs_exporter = new AzureMonitorLogExporter({
    connectionString:
      connectionString,
  });
const logRecordProcessor = new BatchLogRecordProcessor(logs_exporter);
const loggerProvider = new LoggerProvider();
loggerProvider.addLogRecordProcessor(logRecordProcessor);

const sdk = new NodeSDK({
  traceExporter: azureMonitorExporter, // Use Azure Monitor Exporter for traces
  metricReader: new PeriodicExportingMetricReader(metricReaderOptions),
  logRecordProcessors: [logRecordProcessor],
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();