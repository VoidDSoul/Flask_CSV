import pandas as pd
from flask import Flask, render_template, request, send_file

app = Flask(__name__, static_url_path='/static', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def upload_file():
    if 'csv-file' not in request.files:
        return "No file part"
    file = request.files['csv-file']
    if file.filename == '':
        return "No selected file"
    df = pd.read_csv(file)
    # Process the data
    df['sum'] = df.iloc[:, 0] + df.iloc[:, 1]
    # Save the modified data to a CSV file
    output_filename = 'modified_' + file.filename
    df.to_csv(output_filename, index=False)
    # Return the modified CSV data as a downloadable attachment
    return send_file(
        output_filename,
        as_attachment=True,
        download_name=output_filename,
        mimetype='text/csv'
    )

if __name__ == '__main__':
    app.run(debug=True)
